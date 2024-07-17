<script setup>
  import contactForm from "./../../../public/assets/json/contact-form.json";
  import EmailWithSendButton from "./EmailWithSendButton.vue";
  import { ref } from "vue";

  // Compute dynamic col-start class
  const getColumnStartClass = (id) => {
    return `md:row-start-${Math.ceil(id / 2)} md:row-end-${
      Math.ceil(id / 2) + 1
    } 
    md:col-start-${2 - (id % 2)} md:col-end-${3 - (id % 2)}`;
  };

  const WEB3FORMS_ACCESS_KEY = "b07850fe-fc7e-49e0-b4c7-92e7c35feefa";

  // Initialize reactive variables
  const formData = {
    name: ref(""),
    surname: ref(""),
    email: ref(""),
    subject: ref(""),
    message: ref(""),
  };

  const getModelRef = (field) => {
  switch (field.toLowerCase()) {
    case 'name':
      return formData.name;
    case 'surname':
      return formData.surname;
    case 'e-mail':
      return formData.email;
    case 'subject':
      return formData.subject;
    case 'message':
      return formData.message;
    default:
      return ref('');
  }
};

  const submitForm = async () => {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name.value,
        surname: formData.surname.value,
        email: formData.email.value,
        subject: formData.subject.value,
        message: formData.message.value,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log(result);
      // Optionally, reset the form fields
      formData.name.value = "";
      formData.surname.value = "";
      formData.email.value = "";
      formData.subject.value = "";
      formData.message.value = "";
    } else {
      console.error("Error submitting form:", result);
    }
  };
</script>

<template>
  <div class="section">
    <form
      @submit.prevent="submitForm"
      class="form-container md:grid md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr]"
      action=""
    >
      <div
        v-for="(field, index) in contactForm"
        :key="field.id"
        :class="[
          '',
          index < contactForm.length - (contactForm.length % 2 != 0 ? 1 : 2)
            ? getColumnStartClass(field.id)
            : 'md:col-span-2',
        ]"
      >
        <div
          v-if="!field.isMessage"
          class="form-field"
          :class="field.id % 2 != 0 ? 'md:border-r-0' : ''"
        >
          <input
            v-if="field.formField == 'e-mail'"
            v-model="getModelRef(field.formField).value"
            type="email"
            :placeholder="field.formField"
            :required="field.isRequired"
          /><input
            v-else
            v-model="getModelRef(field.formField).value"
            type="text"
            :placeholder="field.formField"
            :required="field.isRequired"
            invalid="border border-pink-2"
          />
        </div>
        <div v-else class="form-field">
          <textarea
            :required="field.isRequired"
            :placeholder="field.formField"
            v-model="getModelRef(field.formField).value"
            name="message"
            cols="30"
            rows="10"
            class="resize-none"
          ></textarea>
        </div>
      </div>
      <EmailWithSendButton
        class="md:col-span-2 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:row-end-4"
        :isWhite="false"
      />
    </form>
  </div>
</template>
