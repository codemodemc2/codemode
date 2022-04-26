<template>
    <div class="border-l-2 border-gray-500">
        <div class="ml-2 flex flex-col gap-2">
            <div class="flex flex-row">
                {{ comment.user.username }} {{ comment.created_at}}
            </div>
            <div class="flex flex-row">
                <span v-html="comment.content"></span>
            </div>
            <div class="flex flex-row gap-2">
                <div><ThumbUpIcon class="w-5"/></div>
                <div><ReplyIcon class="w-5"/></div>
            </div>
        </div>
    </div>
</template>

<script>
import { ThumbUpIcon, ReplyIcon } from '@heroicons/vue/soli d';
const props = defineProps({
    comment:Object,
});
</script>
