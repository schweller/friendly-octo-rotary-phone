import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/configureStore';
import api from '../../shared/utils/api';

interface IndicatorMessage {
  id: number;
  attributes: {
    name: string;
    risk_score: {
      available: boolean;
      value: number;
    };
    subject: string;
    indicator_message_type: 'location' | 'country' | 'businesspartner';
    source: string;
    created_at: string;
    body_with_rendered_links: string;
    valid_until: string;
  };
}

interface IndicatorMessageState {
  error: string | null;
  isLoading: boolean;
  indicatorMessage: IndicatorMessage | null;
  indicatorMessageId: number | null;
}

function startLoading(
  state: IndicatorMessageState,
  action: PayloadAction<number>
) {
  state.indicatorMessageId = action.payload;
  state.isLoading = true;
}

function loadingFailed(state: IndicatorMessageState) {
  state.error = 'Failed to load Indicator Message';
  state.indicatorMessageId = null;
  state.isLoading = false;
}

export const initialState: IndicatorMessageState = {
  error: null,
  indicatorMessageId: null,
  indicatorMessage: null,
  isLoading: false,
};

const indicatorMessage = createSlice({
  name: 'indicatorMessage',
  initialState,
  reducers: {
    getIndicatorMessageStart: startLoading,
    getIndicatorMessageSuccess(state, { payload }) {
      const { indicatorMessage } = payload;
      state.indicatorMessage = indicatorMessage;
      state.isLoading = false;
      state.error = null;
    },
    getIndicatorMessageFailure: loadingFailed,
    resetIndicatorMessage(state) {
      state.indicatorMessageId = null;
      state.indicatorMessage = null;
    },
  },
});

export const {
  getIndicatorMessageStart,
  getIndicatorMessageSuccess,
  getIndicatorMessageFailure,
  resetIndicatorMessage,
} = indicatorMessage.actions;

export default indicatorMessage.reducer;

export const fetchIndicatorMessage = (id: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(getIndicatorMessageStart(id));
    const { data: { data: responseData = {} } = {} } = await api.get(
      `/indicator_messages/${id}?&fields[indicator_message]=name,body,body_with_rendered_links,subject,country,source,risk_score,indicator,indicator_message_type,read_more_url,created_at,valid_until`
    );
    dispatch(getIndicatorMessageSuccess({ indicatorMessage: responseData }));
  } catch (err) {
    dispatch(getIndicatorMessageFailure());
  }
};
