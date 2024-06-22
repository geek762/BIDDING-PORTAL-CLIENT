import dayjs from 'dayjs';
import React from 'react';
import { isEmpty } from 'lodash';

import { Grid, Stack, Divider, Typography } from '@mui/material';

import { useTaskStore } from 'src/stores/admin';

export const TaskDetails = () => {
  const { selectedTask } = useTaskStore();
  return (
    <>
      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={1} px={2}>
        <Grid item xs={12} md={6}>
          <Stack direction="row" width="100%" height="100%" spacing={2}>
            <Stack direction="column" alignItems="center" width="100%" height="100%">
              <Typography sx={{ mt: 0 }} fontSize={20} fontFamily="Poppins">
                {selectedTask?.title}
              </Typography>

              <Divider sx={{ my: 2, width: { md: '100%', xs: '100%' } }} />

              <Typography sx={{ mt: 0 }} fontSize={16} fontFamily="Wix Madefor Display">
                {isEmpty(selectedTask?.description)
                  ? 'No description found'
                  : selectedTask?.description}
              </Typography>

              <Stack direction="column" justifyContent="center" mt={4} width="100%">
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography color="#6c757d" fontFamily="Wix Madefor Display">
                    Created on:
                  </Typography>
                  <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                    {dayjs(selectedTask?.createdAt).format('MMM DD, YYYY')}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography color="#6c757d" fontFamily="Wix Madefor Display">
                    Assigned to:
                  </Typography>
                  {isEmpty(selectedTask?.assignedTo) ? (
                    <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                      No assignee found
                    </Typography>
                  ) : (
                    <Typography color="#212529" fontFamily="Poppins" fontWeight={500}>
                      {selectedTask?.assignedTo}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="center" flexWrap="wrap" mt={4} px={2}>
        {!isEmpty(selectedTask?.images) && (
          <Grid item xs={12} md={6}>
            <Typography fontFamily="Wix Madefor Display">Attachments</Typography>
            <Grid container spacing={2} flexWrap="wrap" mt={0}>
              {selectedTask?.images?.map((image) => (
                <Grid item md={4} sm={12} xs={12}>
                  <img src={image} alt="" width="100%" height={150} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
