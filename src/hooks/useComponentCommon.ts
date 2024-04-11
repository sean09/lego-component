import { computed } from 'vue'
import { pick } from 'lodash-es'
import { TextComponentProps } from '@/defaultProps'

const useComponentCommon = (props: Readonly<Partial<TextComponentProps>>, textStylePropName: Array<string>) => {
  const styleProps = computed(() => {
    return pick(props, textStylePropName)
  })

  const handleClick = () => {
    if(props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }
  return {
    styleProps,
    handleClick
  }
}

export default useComponentCommon