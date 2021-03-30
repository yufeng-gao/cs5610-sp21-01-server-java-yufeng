//citation: used jannunzi java repo's code
package com.example.wbdvsp2101yufengserverjava.services;

import com.example.wbdvsp2101yufengserverjava.models.Widget;
import com.example.wbdvsp2101yufengserverjava.repositories.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {

  @Autowired
  WidgetRepository repository;

  public Widget createWidget(String tid, Widget widget) {
    widget.setTopicId(tid);
    return repository.save(widget);
  }

  public List<Widget> findAllWidgets() {
    return (List<Widget>) repository.findAll();
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    return repository.findWidgetsForTopic(tid);
  }

  public int updateWidget(Long wid, Widget widget) {
    Widget originalWidget = findWidgetById(wid);
    //TODO: copy all the other fields testing for null
    if (widget.getWidgetOrder() != null) {
      originalWidget.setWidgetOrder(widget.getWidgetOrder());
    }
    if (widget.getText() != null) {
      originalWidget.setText(widget.getText());
    }
    if (widget.getSrc() != null) {
      originalWidget.setSrc(widget.getSrc());
    }
    if (widget.getSize() != null) {
      originalWidget.setSize(widget.getSize());
    }
    if (widget.getWidth() != null) {
      originalWidget.setWidth(widget.getWidth());
    }
    if (widget.getHeight() != null) {
      originalWidget.setHeight(widget.getHeight());
    }
    if (widget.getCssClass() != null) {
      originalWidget.setCssClass(widget.getCssClass());
    }
    if (widget.getStyle() != null) {
      originalWidget.setStyle(widget.getStyle());
    }
    if (widget.getValue() != null) {
      originalWidget.setValue(widget.getValue());
    }
    if (widget.isOrdered() != null) {
      originalWidget.setOrdered(widget.isOrdered());
    }
    originalWidget.setType(widget.getType());
    repository.save(originalWidget);
    return 1;
  }

  public Widget findWidgetById(Long id) {
    return repository.findWidgetById(id);
  }

  public int deleteWidget(Long wid) {
    repository.deleteById(wid);
    return 1;
  }
}
