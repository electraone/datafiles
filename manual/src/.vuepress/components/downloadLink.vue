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
  props: ['href', 'description'],
  methods: {}
}
</script>

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
  text-align: left;
  width: 264px;
  float:left;
}

.description {
  color: #666;
  font-size: 80%;
}
</style>
