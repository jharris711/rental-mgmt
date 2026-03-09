<script setup lang="ts">
    import { ref, watch } from 'vue';

    const props = defineProps<{
        username?:      string;
        email?:         string;
        password?:      string;
        submitError?:   string | null;
        isSubmitting?:  boolean;
        onSubmit:       (data: { 
            username: string,
            email:    string,
            password: string
        }) => void | Promise<void>;
        buttonText?:    string;
        clearOnSubmit?: boolean;
    }>();

    const usernameRef = ref(props.username || '');
    const emailRef    = ref(props.email || '');
    const passwordRef = ref(props.password || '');

    watch(() => props.username, (newTitle) => {
        if (newTitle !== undefined) {
            usernameRef.value = newTitle;
        }
    });
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
            username: usernameRef.value,
            email:    emailRef.value,
            password: passwordRef.value
        });
        
        // Clear form after submitting if specified (useful for create form)
        if (props.clearOnSubmit) {
            usernameRef.value = '';
            emailRef.value    = '';
            passwordRef.value = '';
        }
    }
</script>

<template>
    <form @submit="handleSubmit">
        <div class="mb-3">
            <label for="username" class="form-label">User Name</label>
            <input
                type="text" 
                class="form-control"
                id="username"
                v-model="usernameRef"
            >
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                v-model="emailRef"
            >
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
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