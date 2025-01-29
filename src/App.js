import "./App.css";
import { useFetch } from "./useFetch";

function App() {
  const { data, isLoading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div className="container">
      <div>
        <button
          className="button"
          onClick={() =>
            refetch({
              params: {
                _limit: 3,
              },
            })
          }
        >
          Перезапросить
        </button>
      </div>
      {isLoading && "Загрузка..."}
      {error && "Произошла ошибка"}
      {data &&
        !isLoading &&
        data.map((item) => (
          <div key={item.id} className="item">
            {item.title}
          </div>
        ))}
    </div>
  );
}

export default App;
