<template>
  <b-container fluid>
    <div class="div-not-found">
      <span>
        4
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> 4
      </span>
      <p>Page Not Found!</p>
    </div>
  </b-container>
</template>

<script>
export default {};
</script>

<style>
.div-not-found {
  border-radius: 15px;
  grid-gap: 10px;
  margin-top: 20px;
  display: grid;
  text-align: center;
}
.div-not-found span {
  font-size: 200px;
  font-weight: bolder;
  color: rgba(44, 44, 44, 0.8);
}

.div-not-found span i {
  color: rgb(194, 71, 0, 0.8);
}

.div-not-found p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 70px;
  font-weight: 700;
  color: rgba(44, 44, 44, 0.8);
}
</style>