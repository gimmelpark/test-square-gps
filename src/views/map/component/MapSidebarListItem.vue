<template>
  <VListItem>
    <VListItemContent>
      <VListItemTitle class="d-flex align-center">
        <VBtn
          x-small
          icon
          class="mr-3 my-5"
          :disabled="isLoading"
          @click.stop="onEditButtonClick"
        >
          <VIcon>{{ isEditing ? "mdi-content-save" : "mdi-pencil" }}</VIcon>
        </VBtn>

        <div v-if="!isEditing">
          {{ point.title }}
        </div>

        <VTextField v-else v-model="editedTitle" dense @click.native.stop />
      </VListItemTitle>

      <VListItemSubtitle class="text-wrap">
        {{ point.address }}
      </VListItemSubtitle>
    </VListItemContent>

    <VListItemAction>
      <VBtn
        :disabled="isLoading"
        icon
        color="red"
        @click.stop="$emit('delete')"
      >
        <VIcon>mdi-close</VIcon>
      </VBtn>
    </VListItemAction>
  </VListItem>
</template>

<script>
export default {
  props: {
    point: {
      type: Object,
      required: true,
    },
    isLoading: Boolean,
  },

  data: () => ({
    isEditing: false,
    editedTitle: "",
  }),

  methods: {
    onEditButtonClick() {
      if (this.isEditing) {
        this.$emit("save-changes", this.editedTitle);
      } else {
        this.editedTitle = this.point.title;
      }

      this.isEditing = !this.isEditing;
    },
  },
};
</script>
