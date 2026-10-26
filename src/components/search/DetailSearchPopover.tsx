import { useState } from "react";
import { IconClose } from "@/assets";

import { Button } from "@/components/elements/Button";
import { Select } from "@/components/elements/Select";
import { TextInput } from "@/components/elements/TextInput";
import { BTN_TEXTS, PLACEHOLDER_TEXTS } from "@/constants/commonConstants";
import {
  SEARCH_INPUT_MAX_LENGTH,
  SEARCH_INPUT_MIN_LENGTH,
  SEARCH_TARGET_OPTION_VALS,
  SEARCH_TARGET_OPTIONS,
} from "@/constants/searchConstants";
import type { TSearchTarget } from "@/types/bookTypes";

interface DetailSearchPopoverProps {
  handleClose: () => void;
  handleSearch: (query: string, target: TSearchTarget) => void;
}

/* 검색 조건·검색어는 팝업 내부 state → 팝업이 닫히면(언마운트) 초기화
 * - Enter 입력 시 검색 요청 없음 (검색하기 버튼으로만 요청)
 * */
export const DetailSearchPopover = ({
  handleClose,
  handleSearch,
}: DetailSearchPopoverProps) => {
  const [target, setTarget] = useState<TSearchTarget>(
    SEARCH_TARGET_OPTION_VALS.title,
  );
  const [query, setQuery] = useState("");

  const isSearchable = query.trim().length >= SEARCH_INPUT_MIN_LENGTH;

  return (
    <div className="absolute top-full left-1/2 z-30 mt-3.75 flex w-90 -translate-x-1/2 flex-col gap-4 rounded-lg bg-white px-6 py-9 shadow-popover">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-2 right-2 cursor-pointer text-iconGray"
      >
        <IconClose className="size-5" />
      </button>
      <div className="flex items-center gap-1">
        <Select
          value={target}
          options={SEARCH_TARGET_OPTIONS}
          handleChange={setTarget}
        />
        <TextInput
          value={query}
          setValue={setQuery}
          placeholder={PLACEHOLDER_TEXTS.detailSearch}
          maxLength={SEARCH_INPUT_MAX_LENGTH}
        />
      </div>
      <Button
        btnSize="md"
        btnText="body2"
        btnColor="primaryFilled"
        disabled={!isSearchable}
        handleClick={() => handleSearch(query.trim(), target)}
      >
        {BTN_TEXTS.search}
      </Button>
    </div>
  );
};
