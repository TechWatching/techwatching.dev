<script setup lang="ts">
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import SubmitJSON from "submitjson";

const schema = z.object({
  name: z.string().min(2, "Must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Must be at least 10 characters"),
  messageDetails: z.string().optional()
});

type Schema = z.output<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  message: undefined,
  messageDetails: undefined
});

const config = useRuntimeConfig()
const submitJsonApiKey = config.public.submitJsonApiKey
const sj = new SubmitJSON({ apiKey: submitJsonApiKey, endpoint: '3blcoDHQS' })
const toast = useToast()
async function onSubmit (event: FormSubmitEvent<Schema>) {
  let toastMessage = ''
  try {
    await sj.submit(event.data)
    toast.add({
      title: 'Message sent',
      description: 'Thank you for your message!',
      icon: 'i-heroicons-envelope'
    })
    await navigateTo({ path: '/' })
  }
  catch (error) {
    toast.add({
      title: 'Oops',
      description: 'Sorry, your message was not successfully sent, try again or contact me by message on LinkedIn/BueSky/Mastodon.',
      icon: 'i-heroicons-exclamation-circle-20-solid'
    })
  }
}

</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name"/>
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email"/>
    </UFormGroup>

    <UFormGroup label="Message" name="message">
      <UTextarea v-model="state.message" type="text"/>
    </UFormGroup>

    <UFormGroup label="Message details" name="messageDetails" class="hidden">
      <UTextarea v-model="state.messageDetails" type="text"/>
    </UFormGroup>

    <UButton type="submit"> Send</UButton>
  </UForm>
</template>
