import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { api } from "../services";
import { IngredientThumb } from "./Thumb";

// Search-as-you-type ingredient picker shared by the inventory and shopping pages.
export default function IngredientSearch({ placeholder, onPick }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);

  // Debounced lookup. The original fetched with the previous keystroke's value.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setOpen(false); return; }
    setLoading(true);
    setOpen(true);
    let cancelled = false;
    const t = setTimeout(() => {
      api.searchIngredients(q)
        .then((r) => { if (!cancelled) { setResults(r); setActive(0); } })
        .catch(() => { if (!cancelled) setResults([]); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [query]);

  useEffect(() => {
    const onDown = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (item) => {
    setOpen(false);
    setQuery("");
    onPick(item);
  };

  const onKeyDown = (e) => {
    if (!open || !results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    if (e.key === "Enter") { e.preventDefault(); pick(results[active]); }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="search" ref={boxRef}>
      <CiSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim().length >= 2 && setOpen(true)}
        onKeyDown={onKeyDown}
        aria-label={placeholder}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className="search-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            {loading && !results.length && <li className="search-empty">Searching...</li>}
            {!loading && !results.length && <li className="search-empty">No result found</li>}
            {results.map((item, i) => (
              <motion.li
                key={item.id}
                className={i === active ? "is-active" : ""}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); pick(item); }}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.025 }}
              >
                <IngredientThumb item={item} size={28} />
                <span className="search-name">{item.name}</span>
                {item.aisle && <span className="search-aisle">{item.aisle}</span>}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
