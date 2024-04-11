import { mapValues, without } from 'lodash-es'
export interface CommonComponentProps {
  // action
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  // border type
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  // shadow type
  boxShadow: string;
  opcity: string;
  // position
  position: string;
  top: string;
  left: string;
  right: string;
}
export const commonDefaultProps:CommonComponentProps = {
  // action
  actionType: '',
  url: '',
  // size
  height: '',
  width: '300px',
  paddingTop: '0px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  paddingRight: '0px',
  // border type
  borderStyle: 'none',
  borderWidth: '0',
  borderColor: '#000',
  borderRadius: '0',
  // shadow type
  boxShadow: 'none',
  opcity: '1',
  // position
  position: 'absolute',
  top: '0px',
  left: '0px',
  right: '0px'  
}

export interface TextComponentProps extends CommonComponentProps {
  // basic props - font styles
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
export interface ImageComponentProps extends CommonComponentProps {
  src: string
}

export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000',
  backgroundColor: '',
  ...commonDefaultProps
}

export const imageDefaultProps: ImageComponentProps = {
  src: '',
  ...commonDefaultProps
}

export const textStylePropName = without(Object.keys(textDefaultProps), 'text', 'actionType', 'url')
export const imageStylePropName = without(Object.keys(textDefaultProps), 'text', 'actionType', 'url')

export const transformToComponentProps = <T extends object>(props: T) => {
  return mapValues(props, (value) => {
    return {
      type: (value as any).constructor as StringConstructor,
      default: value
    }
  })
}
