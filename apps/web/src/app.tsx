import { useForm } from 'react-hook-form'
import ChevronLeftIcon from './assets/icons/chevron-left.svg?react'
import ChevronRightIcon from './assets/icons/chevron-right.svg?react'
import SearchIcon from './assets/icons/search.svg?react'
import Alert from './components/alert'
import Badge from './components/badge'
import Button from './components/button'
import ButtonIcon from './components/button-icon'
import Divider from './components/divider'
import { ImageFilePreview } from './components/image-file-preview'
import { InputCheckBox } from './components/input-checkbox'
import { InputSingleFile } from './components/input-single-file'
import { InputText } from './components/input-text'

export default function App() {
  const form = useForm()
  const file = form.watch('file')
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined

  return (
    <div className="grid gap-7 p-6">
      <div className="flex gap-3">
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button disabled>Button</Button>
        <Button handling>Loading</Button>
        <Button icon={ChevronRightIcon}>Próxima Imagem</Button>
        <Button variant="ghost" size="sm">
          Button
        </Button>
        <Button variant="primary" size="sm">
          Button
        </Button>
      </div>

      <div className="flex gap-3">
        <ButtonIcon icon={ChevronLeftIcon} />
        <ButtonIcon icon={ChevronRightIcon} variant="secondary" />
      </div>

      <div className="flex gap-3">
        <Badge>Todos</Badge>
        <Badge>Natureza</Badge>
        <Badge>Viagem</Badge>
        <Badge loading>Viagem</Badge>
        <Badge loading>Viagem</Badge>
        <Badge loading>Viagem</Badge>
      </div>

      <div>
        <Alert>
          Tamanho máximo: 50MB
          <br />
          Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
        </Alert>
      </div>

      <div>
        <Divider />
      </div>

      <div>
        <InputText placeholder="Buscar foto" icon={SearchIcon} />
      </div>

      <div>
        <InputCheckBox />
      </div>

      <div>
        <InputSingleFile
          allowedExtensions={['png', 'jpg', 'jpeg', 'webp']}
          maxFileSizeInMb={10}
          replaceBy={<ImageFilePreview src={fileSource} />}
          form={form}
          {...form.register('file')}
        />
      </div>
    </div>
  )
}
