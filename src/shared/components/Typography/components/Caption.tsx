import { CaptionType, DefaultProps } from "@/shared/components/Typography/typography-types"
import { classNames } from "@knownout/lib"
import { useTranslation } from "react-i18next"

interface CaptionProps extends DefaultProps<HTMLDivElement> {
  captionType: CaptionType
}

export default function Caption(props: CaptionProps) {
  const { t } = useTranslation()

  return (
    <div
      className={ classNames("typography-caption", props.className, props.captionType) }
      onClick={ props.onClick }
      style={ props.style }
    >
      { typeof props.children === "string" ? t(props.children) : props.children }
    </div>
  )
}