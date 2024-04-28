import * as React from "react"

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
  >
    <g filter="url(#a)">
      <path
        fill="current"
        d="m6.667 23.667-2.333-2.334L13.666 12 4.334 2.667 6.667.333 16 9.667 25.334.333l2.333 2.334L18.333 12l9.334 9.333-2.334 2.334L16 14.333l-9.333 9.334Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={31.334}
        height={31.333}
        x={0.333}
        y={0.333}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_69_168" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_69_168"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)