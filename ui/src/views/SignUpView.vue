<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import SignUpForm from '@/components/SignUpForm.vue';
  
  const router = useRouter();

  type ErrorRef = Ref<(null | string), (null | string)>
  type User     = { 
    username: string;
    email:    string;
    password: string;
  }

  const submitError: ErrorRef = ref(null);
  const isSubmitting          = ref(false);

  const REGISTER_API_ENDPOINT = "/api/register"

  const handleSubmit = async (data: User) => {
    submitError.value  = null;
    isSubmitting.value = true;

    try {
      const response = await fetch(REGISTER_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        }),
      });

        if (!response.ok) {
          throw new Error('Failed to create todo');
        }

        // Redirect to home page after successful registration
        router.push('/');

    } catch (err) {
        const e           = err as Error;
        submitError.value = e.message;
    } finally {
        isSubmitting.value = false;
    }
  }
</script>

<template>
  <main class="container mt-5">
    <div class="row">
        <h1>Sign Up</h1>
    </div>
    <div class="row mt-4">
        <SignUpForm
          :isSubmitting="isSubmitting"
          :submitError="submitError"
          :onSubmit="handleSubmit"
          buttonText="Sign Up"
          :clearOnSubmit="true"
        />
    </div>
  </main>
</template>

<style scoped></style>
