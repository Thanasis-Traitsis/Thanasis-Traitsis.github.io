<template>
  <div class="portable-text">
    <component
      v-for="(block, index) in blocks"
      :key="index"
      :is="getComponent(block)"
      v-bind="getProps(block)"
    >
      <template v-if="block._type === 'block'">
        <template v-for="(child, childIndex) in block.children" :key="childIndex">
          <a
            v-if="hasLinkMark(child, block)"
            :href="getLinkHref(child, block)"
            target="_blank"
            rel="noopener noreferrer"
            :class="getLinkClasses(child)"
          >
            {{ child.text }}
          </a>
          <span
            v-else
            :class="getMarkClasses(child)"
          >
            {{ child.text }}
          </span>
        </template>
      </template>
    </component>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  blocks: {
    type: Array,
    default: () => []
  }
})

function getComponent(block) {
  if (block._type !== 'block') return 'div'
  
  const styleMap = {
    h2: 'h2',
    h3: 'h3',
    blockquote: 'blockquote',
    normal: 'p'
  }
  
  if (block.listItem) {
    return block.listItem === 'bullet' ? 'li' : 'li'
  }
  
  return styleMap[block.style] || 'p'
}

function getProps(block) {
  const classMap = {
    h2: 'text-3xl font-bold text-gray-900 mb-4 mt-8 font-serif',
    h3: 'text-2xl font-bold text-gray-900 mb-3 mt-6 font-serif',
    blockquote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4',
    normal: 'text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap'
  }
  
  return {
    class: classMap[block.style] || classMap.normal
  }
}

function hasLinkMark(child, block) {
  if (!child.marks || child.marks.length === 0) return false
  if (!block.markDefs || block.markDefs.length === 0) return false
  
  return child.marks.some(mark => {
    return block.markDefs.some(def => def._key === mark && def._type === 'link')
  })
}

function getLinkHref(child, block) {
  if (!child.marks || !block.markDefs) return '#'
  
  const linkMarkKey = child.marks.find(mark => {
    return block.markDefs.some(def => def._key === mark && def._type === 'link')
  })
  
  if (!linkMarkKey) return '#'
  
  const markDef = block.markDefs.find(def => def._key === linkMarkKey)
  return markDef?.href || '#'
}

function getLinkClasses(child) {
  const classes = ['text-gray-900', 'underline', 'hover:text-gray-600', 'transition-colors']
  
  if (child.marks?.includes('strong')) {
    classes.push('font-bold')
  }
  
  if (child.marks?.includes('em')) {
    classes.push('italic')
  }
  
  return classes.join(' ')
}

function getMarkClasses(child) {
  const classes = []
  
  if (child.marks?.includes('strong')) {
    classes.push('font-bold')
  }
  
  if (child.marks?.includes('em')) {
    classes.push('italic')
  }
  
  return classes.join(' ')
}
</script>

<style scoped>
.portable-text {
  @apply text-base md:text-lg;
}
</style>
