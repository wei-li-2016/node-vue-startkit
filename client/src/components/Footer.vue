<template>
  <footer class="footer">
    <span>
      Copyright
      <strong>WishPineBetter</strong> 2018-2020
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  grid-area: footer;
  background: linear-gradient(to right, #263241, #1e2227);
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}
</style>
