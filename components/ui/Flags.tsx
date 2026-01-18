import React from 'react'

interface FlagProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const FlagUK = ({ className, ...props }: FlagProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={className}
    {...props}
  >
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176-6-35L0 0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>
)

export const FlagFR = ({ className, ...props }: FlagProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={className}
    {...props}
  >
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#002395" d="M0 0h213.3v480H0z"/>
    <path fill="#ed2939" d="M426.7 0H640v480H426.7z"/>
  </svg>
)

export const FlagDZ = ({ className, ...props }: FlagProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 480"
    className={className}
    {...props}
  >
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#006233" d="M0 0h320v480H0z"/>
    <path fill="#d21034" d="M410 236.4c0-40.4-38.3-73.4-83.8-62.8 19.4-17.7 58.7-18.3 84.8 5.4 26.2 23.7 27.2 64.1 4.4 89-22.7 24.8-63.5 25.8-84.8 3.5 29.5 7.6 79.4-7.5 79.4-35zm-59 27.6l10 30.5-25.9-18.9-25.7 19.3 9.6-30.7-26.1-18.7h32.2l9.8-30.8 10 30.8h32.2l-26.1 18.5z"/>
  </svg>
)
