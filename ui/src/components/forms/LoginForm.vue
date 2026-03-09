<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps<{
        email?:         string;
        password?:      string;
        submitError?:   string | null;
        isSubmitting?:  boolean;
        onSubmit:       (data: { 
            email:    string,
            password: string
        }) => void | Promise<void>;
        clearOnSubmit?: boolean;
    }>();

    const emailRef    = ref(props.email || '');
    const passwordRef = ref(props.password || '');

    watch(() => props.email, (newTitle) => {
        if (newTitle !== undefined) {
            emailRef.value = newTitle;
        }
    });
    watch(() => props.password, (newTitle) => {
        if (newTitle !== undefined) {
            passwordRef.value = newTitle;
        }
    });

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        props.onSubmit({
            email:    emailRef.value,
            password: passwordRef.value
        });
        
        // Clear form after submitting if specified (useful for create form)
        if (props.clearOnSubmit) {
            emailRef.value    = '';
            passwordRef.value = '';
        }
    }
</script>

<template>
    <form @submit="handleSubmit">
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                id="email"
                v-model="emailRef"
            >
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                class="form-control"
                id="password"
                v-model="passwordRef"
            >
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>