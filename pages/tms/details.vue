<template>
  <div>
    <h1 class="center">
      {{ taskdatas.id }}
    </h1>
    <div>{{ taskdatas.state }}</div>
    <div>{{ taskdatas.publisher }}</div>
    <div>{{ taskdatas.pubdate }}</div>
    <div>{{ taskdatas.cutoff }}</div>
    <Q :data="taskdatas.qtnr" />
  </div>
</template>

<script>
import Q from '~/components/Questionnaire.vue'
export default {
  components: { Q },
  data() {
    return {
    }
  },
  asyncData({ $axios, params, route, redirect }) {
    if (!route.query.taskId) {
      redirect('/tms/view')
      return null
    }
    return $axios.get('/tasks/' + route.query.taskId).then((res) => {
      return { taskdatas: res.data.data }
    })
  }
}
</script>

<style scoped>
table {
  text-align: center;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
