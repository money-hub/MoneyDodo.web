<template>
  <div>
    <div>{{ data.question }}</div>
    <el-input
      v-model="data.answer"
      type="textarea"
      autosize
      placeholder="请输入内容"
    />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
