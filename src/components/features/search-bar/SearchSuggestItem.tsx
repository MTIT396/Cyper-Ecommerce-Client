export default function SearchSuggestItem({ value }: { value: string }) {
   return <li className='cursor-pointer text-sm text-gray-700 hover:text-red-500'>{value}</li>
}
