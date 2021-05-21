<template>
<div class="download">
    <div class="linkContainer">
    <a class="downloadButton" :href="href">Download</a>
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

<style scoped>
.download {
  padding-top: 1em;
  padding-bottom: 3em;
}

.downloadButton {
  background-color: #d66448;
  border: none;
  color: #fff;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  transition-duration: 0.4s;
  border-radius: 8px;
  width: 150px;
}

a.downloadButton:hover {
  background-color: #bb472a;
  text-decoration: none;
}

.linkContainer {
  text-align: left;
  width: 284px;
  float:left;
}

.description {
  color: #666;
  font-size: 80%;
}

</style>
