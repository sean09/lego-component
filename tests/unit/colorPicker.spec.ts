import { VueWrapper, mount, shallowMount } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker.vue'
let wrapper:VueWrapper<any>
const defaultColorList = ['rgb(255, 255, 255)', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
describe('UserProfile.vue', () => {
  jest.useFakeTimers()
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: { color: '#ffffff'},
    })
  })
  it('rander the current interface', async () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.find('input').element
    expect(input.value).toBe('#ffffff')
    expect(input.type).toBe('color')
    expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColorList.length)
    const firstItem = wrapper.get('li:first-child div').element as HTMLLIElement
    expect(firstItem.style.backgroundColor).toBe(defaultColorList[0])
    const lastItem = wrapper.get('li:last-child').element as HTMLLIElement
    expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
  })

  it('should emit color change event', async () => {
    const blackHex = '#000000'
    await wrapper.get('input').setValue(blackHex)
    expect(wrapper.emitted()).toHaveProperty('change')
    const events = wrapper.emitted('change') as [][]
    expect(events[0]).toEqual([blackHex])
  })
  it('should emit transparent event', async () => {
    await wrapper.get('li:first-child div').trigger('click')
    const events = wrapper.emitted('change') as [][]
    expect(events[1]).toEqual([defaultColorList[0]])
  })
})
