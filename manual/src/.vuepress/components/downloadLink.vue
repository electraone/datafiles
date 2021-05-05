<template>
<div class="download">
    <div class="linkContainer">
    <a :href="href">{{ filename }}</a>
    </div>
    <span class="description">{{ description }}</span>
</div>
</template>

<script>
export default {
  props: ['filename', 'href', 'description'],
  methods: {}
}
</script>

<style scoped>
.download {
  float: none;
  padding-top: 1em;
}

.linkContainer {
  text-align: right;
  width: 214px;
  float:left;
}

.description {
  padding-left: 2.5em;
  color: #666;
  font-size: 80%;
}
</style>
