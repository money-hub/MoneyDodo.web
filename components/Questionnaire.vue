<template>
  <div>
    <singlechoice
      v-for="(i, index) in data.singleChoice"
      :key="'singleChoice' + index"
      :data="i"
    />
    <mutiplechoice
      v-for="(i, index) in data.mutipleChoice"
      :key="'mutipleChoice' + index"
      :data="i"
    />
    <query
      v-for="(i, index) in data.query"
      :key="'query' + index"
      :data="i"
    />
  </div>
</template>
<script>
import singlechoice from './SingleChoice.vue'
import mutiplechoice from './MutipleChoice.vue'
import query from './Query.vue'

export default {
  components: { singlechoice, mutiplechoice, query },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
