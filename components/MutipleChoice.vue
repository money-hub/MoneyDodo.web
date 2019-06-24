<template>
  <div>
    <div>{{ data.question }}</div>
    <el-checkbox-group
      v-model="answers"
      @change="checkboxChanged"
    >
      <el-checkbox
        v-for="(i, key) in data.choices"
        :key="key"
        :label="'' + i + key"
      >
        {{ i }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      answers: []
    }
  },
  methods: {
    checkboxChanged(val) {
      this.data.answers = val
    }
  }
}
</script>
