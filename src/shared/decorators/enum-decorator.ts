import { IsEnum, ValidationOptions } from 'class-validator'

export function IsAbstractEnum(
  entity: object,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  const values = Object.values(entity)
  console.log(values, 'sss')
  return IsEnum(entity, {
    message: `$property must be a valid value: ${values.join(' or ')}`,
    ...validationOptions,
  })
}
