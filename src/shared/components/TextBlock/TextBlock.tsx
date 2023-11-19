import Wrapper, { WrapperVariant } from "@/shared/components/Wrapper"
import { classNames } from "@knownout/lib"
import "./TextBlock.scss"


export enum TextBlockType {
  Warning = "warning",
  Error = "error",
  Info = "info"
}

interface Props {
  type: TextBlockType
  children: any
}

export default function TextBlock(props: Props) {
  return (
    <Wrapper variant={ WrapperVariant.FlexColumnLeft } gap={ 8 } className={
      classNames("text-block", props.type)
    }>
      { props.children }
    </Wrapper>
  )
}