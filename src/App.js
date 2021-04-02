import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";

import * as fromMarkSettings from "./reducers/markSettings";

const default_markSetting = [
  {
    id: 1,
    name: "Th",
    full_mark: 100,
    pass_mark: 32,
    weightage: 100
  },
  {
    id: 2,
    name: "Pr",
    full_mark: 100,
    pass_mark: 32,
    weightage: 100
  }
];

export default function App() {
  const [markSettings, setMarkSettings] = useState(default_markSetting);
  const [claszs, setClaszs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [hasPlaceholder, sethasPlaceholder] = useState(false);

  const markSettingsItems = useSelector(fromMarkSettings.getMarkSettings);
  const markSettingsError = useSelector(fromMarkSettings.getMarkSettingsError);
  const markSettingsLoading = useSelector(
    fromMarkSettings.getMarkSettingsStatus
  );
  const markSettingsCreateLoading = useSelector(
    fromMarkSettings.getMarkSettingsCreateStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fromMarkSettings.fetchMarkSettings());
  }, [dispatch]);

  const handleInputChange = (e, markSetting) => {
    dispatch(
      fromMarkSettings.updateMarkSettingsChanges({
        name: e.target.name,
        value: e.target.value,
        markSetting
      })
    );
  };

  const handleAddMarkSetting = () => {
    if (hasPlaceholder) {
      return;
    }

    sethasPlaceholder(true);
    dispatch(fromMarkSettings.addMarkSettings());
  };

  const handleRemoveMarkSetting = (markSetting) => {
    console.log(markSetting);
    if (markSettings.length === 1) {
      return;
    }

    sethasPlaceholder(false);
    dispatch(fromMarkSettings.removeMarkSettings(markSetting));
  };

  return (
    <div className="panel p-5 bg-gray-800 h-screen space-y-3 overflow-y-scroll">
      <div className="max-w-3xl mx-auto">
        <ul className="space-y-4">
          {markSettingsItems &&
            markSettingsItems.map((marksetting, idx) => (
              <li key={`key_${idx}`} className="flex items-end space-x-3">
                <div className="space-y-2">
                  <label className="block text-white">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={marksetting.name}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleInputChange(e, marksetting)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white">Full Mark</label>
                  <input
                    type="number"
                    name="full_mark"
                    value={marksetting.full_mark}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleInputChange(e, marksetting)}
                    max="100"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white">Pass Mark</label>
                  <input
                    type="number"
                    name="pass_mark"
                    value={marksetting.pass_mark}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleInputChange(e, marksetting)}
                    max="100"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white">Weightage</label>
                  <input
                    type="number"
                    name="weightage"
                    value={marksetting.weightage}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleInputChange(e, marksetting)}
                    max="100"
                    min="0"
                  />
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleRemoveMarkSetting(marksetting)}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        <div className="w-full p-4 flex items-center justify-center">
          <button
            onClick={handleAddMarkSetting}
            className="px-2 py-1 bg-green-500 hover:bg-green-400 text-white rounded-md"
          >
            Add New Marks
          </button>
        </div>

        <div className="w-full text-white">
          <pre>{JSON.stringify(hasPlaceholder)}</pre>
          <pre>{JSON.stringify(markSettingsError, null, 2)}</pre>
          <pre>{markSettingsLoading}</pre>
          <pre>{markSettingsCreateLoading}</pre>
          <pre>{JSON.stringify(markSettingsItems, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
