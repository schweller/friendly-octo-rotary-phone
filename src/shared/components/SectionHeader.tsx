import React from 'react'

interface PropsType {
  title: string
}

function SectionHeader({ title }: PropsType) {
  return (
    <h3 className="mt-4 mb-4">{title}</h3>
  )
}

export default SectionHeader
