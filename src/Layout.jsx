import { useMemo, useState } from "react";
import "./Layout.css";
import { routes, welcomes } from "./routes";

export const Layout = () => {
  const sortedRoutes = useMemo(() => {
    const regex = /^([a-zA-Z]+)(\d*)$/;
    const sorted = [...routes].sort((a, b) => {
      const matchA = a.name.match(regex);
      const matchB = b.name.match(regex);
      const textA = matchA ? matchA[1] : a.name;
      const textB = matchB ? matchB[1] : b.name;
      const numA = matchA && matchA[2] ? parseInt(matchA[2], 10) : 0;
      const numB = matchB && matchB[2] ? parseInt(matchB[2], 10) : 0;
      const textCompare = textA.localeCompare(textB);
      if (textCompare !== 0) return textCompare;
      return numA - numB;
    });
    return [...welcomes, ...sorted];
  }, []);

  const [selected, setSelected] = useState(welcomes[0]);

  return (
    <main className="showcase">
      <div className="showcase-panel">
        <div className="showcase-header">
          <div className="showcase-header-avatar"></div>
          <div className="showcase-header-body">
            <p className="showcase-header-title">React Showcase</p>
            <p className="showcase-header-subtitle">By Alberto Fardin</p>
          </div>
        </div>
        <ul className="showcase-list">
          {sortedRoutes.map((route) => {
            const isActive = selected?.path === route.path;
            return (
              <li key={route.path}>
                <button
                  type="button"
                  className={`showcase-listitem ${isActive ? "is-active" : ""}`}
                  onClick={() => setSelected(route)}
                  title={route.name}
                >
                  <p>{route.name}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="showcase-preview">{selected.element}</div>
    </main>
  );
};
