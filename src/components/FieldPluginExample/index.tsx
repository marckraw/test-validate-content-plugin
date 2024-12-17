import './example.css'
import Counter from './Counter'
import ModalToggle from './ModalToggle'
import AssetSelector from './AssetSelector'
import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'



const FieldPlugin: FunctionComponent = () => {
  const { type, data, actions } = useFieldPlugin({
    enablePortalModal: true,
    validateContent: (content: unknown) => {
      // What exactly this function is for ? I understand I can get the content before it will be initialized, so i'm testing agains this here
      if (typeof content === 'string') {
        return {
          content,
        }
      } else {
        // In this case, if the content stored in storyblok is not a string, we will throw / return an error - that was taken from the docs when i first created this plugin
        // i was expecting then, this to raise plugin.type === 'error' so i can react on that, but instead it doesnt really do noithing, and error is just not being passed
        return {
          content,
          error: "content is expected to be a number",
        }
      }
    },
  })

  if (type !== 'loaded') {
    return null
  }

  const closeModal = () => {
    actions.setModalOpen(false)
  }

  console.log("###############")
  console.log(type) // this will never be 'error' which I was expecting will happen when i pass the error in the validateContent function
  console.log("###############")

  return (
    <div>
      {data.isModalOpen && (
        <button
          type="button"
          className="btn btn-close"
          onClick={closeModal}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.75738 0.343176L0.343166 1.75739L4.58581 6.00003L0.343165 10.2427L1.75738 11.6569L6.00002 7.41424L10.2427 11.6569L11.6569 10.2427L7.41423 6.00003L11.6569 1.75739L10.2427 0.343176L6.00002 4.58582L1.75738 0.343176Z"
              fill="#1B243F"
            />
          </svg>
          <span className="sr-only">Close Modal</span>
        </button>
      )}
      <div className="container">
        <Counter
          count={typeof data.content === 'number' ? data.content : 0}
          onIncrease={() => actions.setContent(typeof data.content === 'number' ? data.content + 1 : 1)}
        />
        <hr />
        <ModalToggle
          isModalOpen={data.isModalOpen}
          setModalOpen={actions.setModalOpen}
        />
        <hr />
        <AssetSelector selectAsset={actions.selectAsset} />
      </div>
    </div>
  )
}

export default FieldPlugin
