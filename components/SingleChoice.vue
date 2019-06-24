<template>
  <div>
    <div>{{ data.question }}</div>
    <el-radio-group v-model="data.answer">
      <el-radio
        v-for="(i, index) in data.choices"
        :key="index"
        :label="'' + i + index"
      >
        {{ i }}
      </el-radio>
    </el-radio-group>
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
