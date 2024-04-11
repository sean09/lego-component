<template>
  <component 
    :is="tag" 
    :style="styleProps"
    @click="handleClick"
    class="l-text-component">{{ text }}</component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import { textDefaultProps, textStylePropName, transformToComponentProps } from '@/defaultProps'
const defaultProps = transformToComponentProps(textDefaultProps)
export default defineComponent({
  name: 'LText',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    ...defaultProps
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(props, textStylePropName)
    console.log(props, styleProps)
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>