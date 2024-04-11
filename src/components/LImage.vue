<template>
  <component 
    :is="'img'"
    :style="styleProps"
    :src="src"
    @click="handleClick"
    class="l-image-component"></component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import { imageDefaultProps, imageStylePropName, transformToComponentProps } from '@/defaultProps'
const defaultProps = transformToComponentProps(imageDefaultProps)
export default defineComponent({
  name: 'LImage',
  props: {
    ...defaultProps
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(props, imageStylePropName)
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.l-image-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>