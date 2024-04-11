<template>
  <div class="uploader">
    <div v-on="events" :class="{ 'drag-area': drag, 'drag-over': isDragOver }">
      <slot name="loading" v-if="uploadLoading">
        <button :loading="uploadLoading" >正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input ref="fileInput" @change="handleFileChange" type="file" style="display: none;">
  </div>
  <ul class="file-list" v-if="showList">
    <li :class="`file-item upload-${file.status}`" v-for="file in fileList" :key="file.uid">
      <img v-if="file.url" :src="file.url" alt="">
      <span>{{ file.name }}</span>
      <button class="del-btn" @click="delFile(file.uid)" size="small">del</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, PropType } from "vue";
import { v4 as uuid } from 'uuid'
import { last } from 'lodash-es'
import axios from 'axios';


type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckUpload = (file: File) => boolean | Promise<File>
export interface UploadFile {
  uid: string,
  name: string,
  size: number,
  status: UploadStatus,
  raw: File,
  resp?: any,
  url?: string,
}
type ListType = 'picture' | 'text'
export default defineComponent({
  name: "uploader-component",
  components: {
    
  },
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>
    },
    onSuccess: {
      type: Function
    },
    drag: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      required: false
    },
    listType: {
      type: String as PropType<ListType>,
      default: 'text'
    },
    showList: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const fileInput = ref<HTMLInputElement | null>(null)
    const fileList = ref<UploadFile[]>([])
    const isDragOver = ref(false)
    const uploadLoading = computed(() => {
      return fileList.value.some(item => item.status === 'loading')
    })
    const lastFileData = computed(() => {
      const lastFile = last(fileList.value)
      if(lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })
    const triggerUpload = () => {
      if(uploadLoading.value) {
        return
      }
      if(fileInput.value) {
        fileInput.value.click()
      }
    }
    let events: { [key: string]: (e: any) => void } = {
      'click': triggerUpload
    }
    const postFile = (fileObj: UploadFile) => {
      const fileData = new FormData()
      fileData.append(fileObj.name, fileObj.raw)
      fileObj.status = 'loading'
      axios.post(props.action, fileData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: any) => {
          const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          console.log(complete)
        }
      }).then((res) => {
        fileObj.status = 'success'
        fileObj.resp = res.data
        props.onSuccess && props.onSuccess(res.data)
        console.log(res.data)
      }).catch(err => {
        fileObj.status = 'error'
        console.log(err)
      }).finally(() => {
        if(fileInput.value) {
          fileInput.value.value = ''
        }
      })
    }
    const addToFileList = (file: any) => {
      const fileItem: UploadFile = reactive<UploadFile>({
        uid: uuid(),
        name: file.name,
        size: file.size,
        status: 'ready',
        raw: file,
      })
      fileList.value.push(fileItem)
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = (e: any) => {
        fileItem.url = e.target.result
      }
      if(props.autoUpload) {
        postFile(fileItem)
      }
    }
    const beforeUploadCheck = (file: any) => {
      if(props.beforeUpload) {
        const result = props.beforeUpload(file)
        if(result instanceof Promise) {
          result.then(res => {
            addToFileList(res)
          })
        }
        // else {
        //   addToFileList(file)
        // }
      }else {
        addToFileList(file)
      }
    }
    const handleFileChange = (e: any) => {
      const file = e.target.files[0]
      beforeUploadCheck(file)
    }
    const uploadFiles = () => {
      fileList.value.filter(item => item.status === 'ready').forEach(fileObj => postFile(fileObj))
    }
    const delFile = (id: string) => {
      fileList.value = fileList.value.filter(item => item.uid !== id)
    }
    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault()
      isDragOver.value = over
    }
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      if(e.dataTransfer) {
        const files = e.dataTransfer?.files
        isDragOver.value = false
        addToFileList(files[0])
      }
    }
    if(props.drag) {
      events = {
        ...events,
        dragover: (e) => handleDrag(e, true),
        dragleave:  (e) => handleDrag(e, false),
        drop: handleDrop
      }
    }
    return {
      triggerUpload,
      fileInput,
      handleFileChange,
      fileList,
      uploadLoading,
      delFile,
      lastFileData,
      events,
      handleDrag,
      handleDrop,
      isDragOver,
      uploadFiles,
    };
  },
});
</script>
<style lang="less">
.uploader {
  .file-list {
    
  }
}
.drag-area {
  width: 300px;
  height: 150px;
  background: #efefef;
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  line-height: 110px;
  &:hover {
    border: 1px dashed #1890ff;
  }
}
.drag-over {
  border: 2px dashed #1890ff;
  background: rgba(#1890ff, .2);
}
.upload-loading {
  color: #f0af41
}
.upload-success {
  color: #1677ff
}
.upload-error {
  color: #ff4d4f
}
</style>
