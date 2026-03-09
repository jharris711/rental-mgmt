<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import LoginForm from '@/components/forms/LoginForm.vue';
  
  const router = useRouter();

  type ErrorRef = Ref<(null | string), (null | string)>
  type User     = {
    email:    string;
    password: string;
  }

  const submitError: ErrorRef = ref(null);
  const isSubmitting          = ref(false);

  const LOGIN_API_ENDPOINT = "/api/login"

  const handleSubmit = async (data: User) => {
    submitError.value  = null;
    isSubmitting.value = true;

    try {
      const response = await fetch(LOGIN_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

        if (!response.ok) {
          throw new Error(`Failed to login user`);
        }

        // Redirect to home page after successful registration
        router.push('/');

    } catch (err) {
        const e           = err as Error;
        alert(`Failed to log in user: ${e.message}`)
        submitError.value = e.message;
    } finally {
        isSubmitting.value = false;
    }
  }
</script>

<template>
  <main class="container mt-5">
    <div class="row">
        <h1>Log In</h1>
    </div>
    <div class="row mt-4">
        <LoginForm
          :isSubmitting="isSubmitting"
          :submitError="submitError"
          :onSubmit="handleSubmit"
          :clearOnSubmit="true"
        />
    </div>
  </main>
</template>

<style scoped></style>
