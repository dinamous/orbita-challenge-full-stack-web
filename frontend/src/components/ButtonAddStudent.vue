<template>
  <v-dialog v-model="dialog" width="75vw" @click:outside="closeDialog">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props">
        <v-btn class="d-block d-lg-none" color="#5865f2" variant="flat" block v-bind="props">
          Cadastrar Aluno
        </v-btn>
        <v-btn class="d-none d-lg-flex" color="#5865f2" variant="flat" v-bind="props">
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
              <v-text-field v-model="formData.name" label="Nome completo" variant="outlined" :rules="[rules.required]"
                maxlength="80" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.email" label="Email" variant="outlined"
                :rules="[rules.required, rules.email]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formData.cpf" label="CPF" variant="outlined" maxlength="14"
                :rules="[rules.required, rules.cpf]" @input="sanitizeAndFormatCPF" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="8" :sm="6" :xs="12">
              <v-text-field v-model="formData.ra" label="RA" variant="outlined" :rules="[rules.required, rules.numeric]"
                :readonly="editMode" hint="O RA deve ser um identificador unico." @input="preventEditIfReadonly" />
            </v-col>

            <v-col cols="12" :md="4" :sm="6" :xs="12">
              <v-btn block height="50" prev-icon="mdi-plus" color="indigo-darken-3" :disabled="editMode"
                @click="generateRA">
                Gerar RA
              </v-btn>
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

const dialog = ref(props.open);
const form = ref<VForm | null>(null);
const isValid = ref(false);
const editMode = ref(false);
const formData = ref<Student>({
  name: '',
  email: '',
  cpf: '',
  ra: '',
  id: '',
});

const studentStore = useStudentStore();

const rules = {
  required: (value: string) => !!value || 'Campo obrigatório.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
  cpf: (value: string) => validateCPF(value) || 'CPF inválido.',
  numeric: (value: string) => /^\d+$/.test(value) || 'Deve conter apenas números.',
};

watch(() => props.open, (newVal) => {
  dialog.value = newVal;
  if (!newVal) {
    resetForm();
  }
});

watch(() => props.student, (student) => {
  if (student) {
    editMode.value = true;
    formData.value = { ...student, cpf: formatCPFForDisplay(student.cpf) };
    dialog.value = true;
  } else {
    editMode.value = false;
    resetForm();
  }
});

const closeDialog = () => {
  dialog.value = false;
  resetForm();
};

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


const saveStudent = () => {
  if (form.value?.validate()) {
    const sanitizedData = {
      ...formData.value,
      cpf: formData.value.cpf.replace(/\D/g, ''),
    };
    if (editMode.value) {
      studentStore.updateStudent(sanitizedData);
    } else {
      studentStore.addStudent(sanitizedData);
    }
    closeDialog();
  }
};


const preventEditIfReadonly = (value: string) => {
  if (editMode.value) {

    formData.value.ra = props.student?.ra || '';
  } else {

    formData.value.ra = value.replace(/\D/g, '');
  }
};

const sanitizeAndFormatCPF = (event: Event) => {
  const input = event.target as HTMLInputElement;

  const onlyNumbers = input.value.replace(/\D/g, '');
  formData.value.cpf = onlyNumbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatCPFForDisplay = (cpf: string) => {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};


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
const generateRA = () => {
  if (!editMode.value) {
    const randomRA = Math.floor(Math.random() * Math.pow(10, 10));
    formData.value.ra = randomRA.toString().padStart(10, '0');
  }
};
</script>
