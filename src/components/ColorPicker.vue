<template>
  <div class="color-picker">
    <div class="input-wrapper">
      <input type="color" :value="color" @input="handleChangeColor">
    </div>
    <ul class="picked-color-list">
      <li v-for="(item, index) in defaultColorList" :key="index" :class="{ 'transparent-back': item == '' }">
        <div @click="handleClickColor(item)" :style="{ backgroundColor: item }"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
const defaultColorList:string[] = ['rgb(255, 255, 255)', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
export default defineComponent({
  name: "color-picker",
  props: {
    color: {
      type: String,
      default: 'rgb(255, 255, 255)'
    }
  },
  emits: ['change'],
  components: {
    
  },
  setup(props, context) {
    const handleChangeColor = (e: any) => {
      context.emit('change', e.target.value)
    }
    const handleClickColor = (item: string) => {
      context.emit('change', item)
    }
    return {
      defaultColorList,
      handleChangeColor,
      handleClickColor
    };
  },
});
</script>
<style lang="less">
  .color-picker {
    display: flex;
    .input-wrapper {
      width: 65px;
      height: 40px;
      flex-shrink: 0;
      input {
        width: 100%;
        height: 100%;
      }
    }
    .picked-color-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 4px;
        border: 1px solid #ccc;
        margin-bottom: 6px;
        div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
