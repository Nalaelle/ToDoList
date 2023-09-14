<script setup lang="ts">
import { TodoStatus } from '@/type';
import TodoGroup from "./TodoGroup.vue"

</script>

<template>
      <div class="groups-wrapper res">
            <TodoGroup :status="TodoStatus.Pending" />
            <TodoGroup :status="TodoStatus.InProgress" />
            <TodoGroup :status="TodoStatus.Completed" />
      </div>
</template>

<style scoped>

.groups-wrapper {
      display: flex;
      justify-content: center;
      gap: 20px;
}

@media (max-width: 700px) {
      .res {
        flex-direction: column;
    }
}

</style>
