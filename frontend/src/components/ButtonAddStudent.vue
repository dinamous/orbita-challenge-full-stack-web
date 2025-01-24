<template>
  <v-dialog v-model="dialog" width="60vw">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props">
        <v-btn v-bind="props">
          Cadastrar Aluno
        </v-btn>
      </slot>
    </template>
    <v-card>
      <v-card-title>
        {{ editMode ? 'Editar Aluno' : 'Cadastro de novo aluno' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="formData.name" label="Nome completo" variant="outlined"
                :rules="[rules.required]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.email" label="Email" variant="outlined"
                :rules="[rules.required, rules.email]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.cpf" label="CPF" variant="outlined" maxlength="14"
                :rules="[rules.required, rules.cpf]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.ra" label="RA" variant="outlined" :rules="[rules.required, rules.numeric]"
                :readonly="editMode" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn variant="text" @click="closeDialog">
          Cancelar
        </v-btn>
        <v-btn variant="tonal" color="success" :disabled="!isValid" @click="saveStudent">
          {{ editMode ? 'Salvar Alterações' : 'Salvar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStudentStore } from '../stores/students';
import type { Student } from '../types/Student';
import type { VForm } from 'vuetify/components';

// Props
const props = defineProps({
  student: {
    type: Object as () => Student | null,
    default: null,
  },
  open: {
    type: Boolean,
    default: false,
  },
});

// Refs e estado
const dialog = ref(props.open);
const form = ref<VForm | null>(null);
const isValid = ref(false);
const editMode = ref(false);
const formData = ref<Student>({
  name: '',
  email: '',
  cpf: '',
  ra: '',
  id: ''
});

// Store
const studentStore = useStudentStore();

// Regras de validação
const rules = {
  required: (value: string) => !!value || 'Campo obrigatório.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
  cpf: (value: string) => validateCPF(value) || 'CPF inválido.',
  numeric: (value: string) => /^\d+$/.test(value) || 'Deve conter apenas números.',
};

// Quando a prop 'open' for alterada, vamos controlar o estado do modal
watch(() => props.open, (newVal) => {
  dialog.value = newVal;
  if (!newVal) {
    resetForm();
  }
});

// Quando a prop 'student' for alterada, vamos preencher os dados de edição
watch(() => props.student, (student) => {
  if (student) {
    editMode.value = true;
    formData.value = { ...student };
    dialog.value = true;
  } else {
    editMode.value = false;
    resetForm();
  }
});

// Fechar diálogo e resetar formulário
const closeDialog = () => {
  dialog.value = false;
  resetForm();
};

// Resetar formulário
const resetForm = () => {
  form.value?.resetValidation();
  formData.value = {
    name: '',
    email: '',
    cpf: '',
    ra: '',
    id: '',
  };
};

// Salvar estudante
const saveStudent = () => {
  if (form.value?.validate()) {
    if (editMode.value) {
      studentStore.updateStudent(formData.value);  // Atualiza o aluno
    } else {
      studentStore.addStudent(formData.value);  // Adiciona o aluno
    }
    closeDialog();
  }
};

// Validação de CPF
const validateCPF = (cpf: string) => {
  const cleanedCPF = cpf.replace(/\D/g, '');
  if (cleanedCPF.length !== 11) return false;

  const [d1, d2] = [cleanedCPF.slice(0, 9), cleanedCPF.slice(0, 10)];
  const validateDigit = (block: string, digit: number) => {
    let sum = 0;
    for (let i = 0; i < block.length; i++) {
      sum += parseInt(block[i]) * (block.length + 1 - i);
    }
    const checkDigit = (sum * 10) % 11;
    return checkDigit === digit || (checkDigit === 10 && digit === 0);
  };

  return (
    validateDigit(d1, parseInt(cleanedCPF[9])) &&
    validateDigit(d2, parseInt(cleanedCPF[10]))
  );
};
</script>
