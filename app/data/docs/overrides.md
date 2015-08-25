# Override system

## Form overrides

Form fields can be overriden at different level of form. 
We describe all levels from the more specific which win 
To the less specicific

###  1/ Per State (edit, create, delete)

* formId
    - stateId 
        + fields: 
            * fieldId: 
                - prop1: value1
                - prop2: value2

### 2/ Per form for a specific field

* formId
    - fields: 
        + fieldId: 
            - prop1: value1
            - prop2: value2

### 3/ Per form for all form fields

* formId
    - field: 
        * prop1: value1
        * prop2: value2

### 4/ At field level in fields.yml 

* fieldId: 
    * prop1: value1
    * prop2: value2

### 5/ For all forms and all fields (in form.yml)

* field: 
    * prop1: value1
    * prop2: value2


## Blocks overrides

In the following example:
id, title, text are standard properties
forgot password is a subBlock a block inside the first block 
It generally can have the same properties as its parent

```yml
blocks:
  signin:
    id: 'signin'
    title: '#holaSpirit'
    forgotPassword:
      title: "Hello world"
      text: "Have an access problem ? "
      ngClick: "main.fn.askPasswordReset()"
```










