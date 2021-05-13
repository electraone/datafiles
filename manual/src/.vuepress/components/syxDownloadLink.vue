<template>
<div class="download">
    <div class="syxDownloadLink">
    <a :href="href">{{ description }}</a>
    </div>
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
  text-align: right;
  font-size: 80%;
}

a {
  text-color: blue;
}

</style>
