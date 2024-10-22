"use client"

import { Paintbrush } from "lucide-react"
import { motion } from "framer-motion"

interface SpinnerProps {
  size?: number
  color?: string
  strokeWidth?: number
  containerSize?: number
}

export default function LoadingSpinner({ 
  size = 48, 
  color = "currentColor", 
  strokeWidth = 2,
  
}: SpinnerProps) {
  return (
    <div 
     
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Paintbrush size={size} color={color} strokeWidth={strokeWidth} />
      </motion.div>
    </div>
  )
}