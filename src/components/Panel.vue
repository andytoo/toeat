<template>
    <div class="border rounded shadow-md py-5 w-11/12 my-10 mx-auto flex flex-col items-center">
        <h1 class="block text-4xl mb-5">{{ title }}</h1>
        <slot name="input-field" />
    </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style lang="postcss">
    .input-form {
        @apply block border rounded my-2 py-2 pl-3 w-10/12
    }
    .form-submit-button {
        @apply border rounded shadow-sm mt-4 py-1 w-10/12
    }
</style>
