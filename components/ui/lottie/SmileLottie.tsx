'use client'

import smile from '@/components/ui/lottie/json/smile.json'
import Lottie from 'lottie-react'
import type { CSSProperties } from 'react'

type Props = {
  animationData: any
  loop?: boolean
  autoplay?: boolean
  width?: number | string
  height?: number | string
  style?: CSSProperties
}

export const LottiePlayer = ({
  animationData,
  loop = true,
  autoplay = true,
  width,
  height,
  style,
}: Props) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width, height, ...style }}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
    />
  )
}

export const SmileLottie = (props: { height?: number; width?: number; style?: CSSProperties }) => {
  return <LottiePlayer animationData={smile} loop {...props} />
}
