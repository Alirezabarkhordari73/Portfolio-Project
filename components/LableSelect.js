import React, { useState, useEffect } from "react";

import "./LabeledSelect.css";
import { TickBox } from "./Controls";
import NumToPersian from "../../utils/NumToPersian";
import { useRef } from "react";

export default function LabeledSelect(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(props.placeHolder);
  const [filter, setFilter] = useState();
  const [items, setItems] = useState(props.items);
  const [selected, setSelected] = useState(
    Array.isArray(props.selected) ? props.selected : []
  ); //Array.isArray(props.items)?  new Array(props.items.length).fill(false) :
  const [selectedIndex, setSelectedIndex] = useState();
  const [hoveredIndex, setHoveredIndex] = useState();

  const selectListRef = useRef();

  useEffect(() => {
    setSelected(Array.isArray(props.selected) ? props.selected : []);
  }, [props.selected]);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  useEffect(() => {
    setText(props.placeHolder);
  }, [props.placeHolder]);

  useEffect(() => {
    const item = props.items.find((it) => it.value == props.defaultValue);
    if (item) {
      setText(item.title);
      props.onChange(item.value);
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (props.multiSelect) {
      const count = Array.isArray(selected)
        ? selected.reduce((c, b) => (b ? c + 1 : c), 0)
        : 0;
      if (count) setText(NumToPersian(count) + " مورد انتخاب شده است");
      else setText("موردی انتخاب نشده است");
    }
  }, [selected]);

  useEffect(() => {
    setHoveredIndex(undefined);
  }, [filter]);

  // useEffect(
  //     ()=>{
  //         if(props.searchable && filter)
  //         {
  //             const pat=new RegExp(`.*${String(filter).replaceAll('ي','ی')}.*|.*${String(filter).replaceAll('ی','ي')}.*`);
  //             setItems(props.items.filter(i => pat.test( i.title)));
  //         }
  // },[filter]) ;

  function itemFilter(it) {
    const f = String(filter).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); //make string regex safe
    const pat = new RegExp(
      `.*${f.replaceAll("ي", "ی")}.*|.*${f.replaceAll("ی", "ي")}.*`
    );
    if (props.searchable && filter) return pat.test(it.title);
    else return true;
  }

  const toggleOpen = () => setOpen(!open && !props.disabled);

  function doSelect(it) {
    //if(i in items.filter(itemFilter))
    //{
    //const it=items.filter(itemFilter)[i]
    if (!it) it = items.filter(itemFilter)[hoveredIndex ? hoveredIndex : 0];
    if (!it) return;
    toggleOpen();
    setText(it.title);
    if (props.searchable) setFilter("");
    const selIndex = items.findIndex((item) => item.value == it.value);
    if (isNaN(selIndex)) {
      console.log("selIndex is nan");
      return; /*possible error guard*/
    }
    setSelectedIndex(selIndex);
    props.onChange && props.onChange(it.value, selIndex);
    //}
  }

  function handleKeyDown(e) {
    if (
      e &&
      e.preventDefault instanceof Function &&
      e.keyCode >= 37 &&
      e.keyCode <= 40
    )
      e.preventDefault();
    const numitems = items.filter(itemFilter).length;
    if (
      e.keyCode === 32 &&
      props.multiSelect &&
      hoveredIndex >= 0 &&
      hoveredIndex <= items.length
    )
      handleSelChange(!selected[hoveredIndex], hoveredIndex);
    else if (
      e.keyCode === 13 ||
      e.keyCode === 32 /*|| e.keyCode===37 || e.keyCode===39*/
    )
      doSelect();
    else if (e.keyCode === 9) setOpen(false);
    else if (e.keyCode === 27) {
      setOpen(false);
      setFilter("");
    } else if (e.keyCode === 40 /*down*/ || e.keyCode === 38 /*up*/)
      if (!open) toggleOpen();
      else {
        const nh =
          hoveredIndex >= 0
            ? (hoveredIndex + (e.keyCode === 40 ? 1 : -1) + numitems) % numitems
            : 0;
        setHoveredIndex(nh);
        selectListRef.current
          .querySelector(`:nth-child(${nh + 1})`)
          .scrollIntoView();
      }
  }

  function handleSelChange(checked, i) {
    selected[i] = checked;
    if (props.noneValue)
      if (items[i].value == props.noneValue)
        //if there exist a hichkodam item
        selected.forEach((e, j) => {
          if (j != i) selected[j] = false;
        });
      else {
        const noneindex = items.findIndex(
          (item) => item.value == props.noneValue
        );
        if (noneindex in selected) {
          selected[noneindex] = false;
        }
      }

    const newselected = [...selected];
    setSelected(newselected);
    props.onSelectionChange && props.onSelectionChange(newselected);
  }

  return (
    <div
      className="LSelectBox"
      tabIndex={props.searchable ? -1 : 0}
      onBlur={(e) => {
        if (
          !(props.multiSelect || props.searchable) ||
          !e.currentTarget.contains(e.relatedTarget)
        )
          setOpen(false);
      }}
      onKeyDown={handleKeyDown}
      style={{
        ...props.style,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={"LSelectBoxButton" + (open ? " Open" : "")}
        onClick={toggleOpen}
        style={{
          border: props.disabled ? "1px solid #c9c9c9" : null,
          backgroundColor: props.disabled ? "#eeee" : null,
        }}
      >
        <span style={{ fontWeight: text != props.placeHolder ? 700 : 400 }}>
          {props.label}
        </span>
        {props.searchable ? (
          <input
            type="text"
            placeholder={text}
            style={{
              fontWeight: text != props.placeHolder ? 700 : 400,
              width: "80%",
            }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span style={{ fontWeight: text != props.placeHolder ? 700 : 400 }}>
            {text}
          </span>
        )}
        <svg className="LSelectBoxArrow" viewBox="0 0 14 8">
          <polyline points="1 1 7 6 13 1"></polyline>
        </svg>
      </div>
      <div
        className="LSelectOptions"
        ref={selectListRef}
        style={{ display: open ? "block" : "none" }}
      >
        {items.filter(itemFilter).map((item, i) =>
          props.multiSelect ? (
            <TickBox
              className={i === hoveredIndex ? "hovered" : ""}
              key={item.value}
              text={item.title}
              value={selected[i]}
              onChange={(e) => handleSelChange(e.target.checked, i)}
              onMouseMove={() => setHoveredIndex(i)}
            />
          ) : (
            <div
              key={item.value}
              className={
                "LSelectOption" + (i === hoveredIndex ? " hovered" : "")
              }
              onClick={() => {
                doSelect(item);
              }}
              onMouseMove={() => setHoveredIndex(i)}
            >
              <span>{item.title}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
