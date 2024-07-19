import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function Home() {
  const categoryStote = useSelector((state: RootState) => state.category);
  console.log("categoryStote", categoryStote)
  return (
    <div>
      <h1>category</h1>
      <ul>
        {categoryStote.data?.map((category) => (
          <li key={category.id}>
            <img src={category.iconUrl} alt={category.name} />
            <p>{category.name}</p>
            <p>{category.status ? "con ban" : "het ban"}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
