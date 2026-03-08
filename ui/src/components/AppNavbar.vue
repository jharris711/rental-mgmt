<script setup lang="ts"></script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <RouterLink
                class="navbar-brand"
                to="/"
            >
                Rental Management
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink
                        class="nav-link active"
                        aria-current="page"
                        to="/"
                        >
                            Home
                        </RouterLink>
                    </li>
                </ul>
                <div class="d-flex gap-2">
                    <RouterLink
                        class="btn btn-primary"
                        to="/login"
                    >
                        Log In
                    </RouterLink>
                    <RouterLink
                        class="btn btn-outline-primary"
                        to="/signup"
                    >
                        Sign Up
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>