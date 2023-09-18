<template>
  <div>{{ $t("asd") }}</div>
</template>

<script>
export default {
  computed: {
    test() {
      const a = 1;

      return a;
    },
  },
};
</script>

<i18n>
{
  "en": {
    "asd": "asd))"
  },
  "ru": {
    "asd": "asd2))"
  }
}
</i18n>
